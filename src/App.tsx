import { useState } from "react";
import Input from "./Input";

interface BirthDate {
    year: number;
    month: number;
    day: number;
}
interface Age {
    years: number;
    months: number;
    days: number;
}
interface BirthErrors {
    day: string | boolean | undefined;
    month: string | boolean | undefined;
    year: string | boolean | undefined;
}

function useAge(initialInfo: BirthDate, now: Date) {
    function calcAge(info: BirthDate): [Age, BirthErrors | undefined] {
        const errors = getBirthErrors(info, now);
        if (errors) {
            return [{ years: NaN, months: NaN, days: NaN }, errors];
        }

        const date = new Date(info.year, info.month - 1, info.day);

        const diff = Math.floor(now.getTime() - date.getTime());
        const day = 1000 * 60 * 60 * 24;

        const days = Math.floor(diff / day);
        const months = Math.floor(days / 31);
        const years = Math.floor(months / 12);

        return [
            {
                days: days % 30,
                months: months % 12,
                years,
            },
            undefined,
        ];
    }
    function setDate(info: BirthDate) {
        const [age, errors] = calcAge(info);
        setAge(age);
        setErrors(errors);
    }

    const [initAge] = calcAge(initialInfo);
    const [age, setAge] = useState<Age>(initAge);
    const [errors, setErrors] = useState<BirthErrors | undefined>(undefined);

    return [age, errors, setDate] as const;
}

function cleanInput(input: string) {
    return input.replace(/[^0-9]+/g, "");
}
function getBirthErrors(
    { year, month, day }: BirthDate,
    now: Date = new Date(),
): BirthErrors | undefined {
    let d: string | boolean | undefined = undefined;
    let m: string | boolean | undefined = undefined;
    let y: string | boolean | undefined = undefined;

    const timeYear = new Date(`${year}-1-1`).getTime();
    const timeMonth = new Date(`${year}-${month}-1`).getTime();
    const time = new Date(`${year}-${month}-${day}`).getTime();
    let past = false;
    if (isNaN(year) || year <= 0) y = "invalid year";
    if (isNaN(month) || month <= 0 || month > 12) m = "invalid month";
    if (isNaN(day) || day <= 0 || day > 31) d = "invalid day";
    if (timeYear > now.getTime()) {
        y = "must be in the past";
        past = true;
    }
    if (!past && timeMonth > now.getTime()) {
        m = "must be in the past";
        past = true;
    }
    if (!past && time > now.getTime()) {
        d = "must be in the past";
    }
    if (isNaN(time) || time > now.getTime()) {
        if (!d && !m && !y) {
            d = "invalid date";
        }
        d ||= true;
        m ||= true;
        y ||= true;
    }

    if (d || m || y) return { day: d, month: m, year: y };

    return undefined;
}

function App() {
    const now = new Date();

    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    const [{ years, months, days }, errors, updateAge] = useAge(
        { year: NaN, month: NaN, day: NaN },
        now,
    );

    return (
        <form className="flex min-h-screen w-full items-center justify-center bg-gray-100 p-4">
            <div className="w-[40rem] max-w-full rounded-2xl rounded-br-[5rem] bg-white p-8 shadow-xl sm:rounded-br-[10rem]">
                <div className="flex gap-4">
                    <Input
                        name="DAY"
                        content={day}
                        onChange={(e) => setDay(cleanInput(e.target.value))}
                        placeholder={"DD"}
                        error={errors?.day}
                        className="min-w-0"
                    />
                    <Input
                        name="MONTH"
                        content={month}
                        onChange={(e) => setMonth(cleanInput(e.target.value))}
                        placeholder={"MM"}
                        error={errors?.month}
                        className="min-w-0"
                    />
                    <Input
                        name="YEAR"
                        content={year}
                        onChange={(e) => setYear(cleanInput(e.target.value))}
                        placeholder={"YYYY"}
                        error={errors?.year}
                        className="min-w-0"
                    />
                </div>
                <div className="my-4 flex items-center gap-4">
                    <div className="h-px grow border-t border-t-black/40"></div>
                    <button
                        type="submit"
                        onClick={(ev) => {
                            ev.preventDefault();
                            updateAge({
                                year: parseInt(year),
                                month: parseInt(month),
                                day: parseInt(day),
                            });
                        }}
                        className="cursor-pointer rounded-full bg-purple-600 p-3 transition hover:bg-black"
                    >
                        <img
                            className="size-10"
                            src={"assets/images/icon-arrow.svg"}
                            alt="ENTER"
                        />
                    </button>
                    <div className="h-px grow border-t border-t-black/40 sm:grow-0"></div>
                </div>
                <div>
                    <div className="text-5xl font-bold italic sm:text-6xl">
                        <span className="text-purple-800">
                            {isNaN(years) ? "--" : years}
                        </span>{" "}
                        year{years !== 1 ? "s" : ""}
                    </div>
                    <div className="text-5xl font-bold italic sm:text-6xl">
                        <span className="text-purple-800">
                            {isNaN(months) ? "--" : months}
                        </span>{" "}
                        month{months !== 1 ? "s" : ""}
                    </div>
                    <div className="text-5xl font-bold italic sm:text-6xl">
                        <span className="text-purple-800">
                            {isNaN(days) ? "--" : days}
                        </span>{" "}
                        day{days !== 1 ? "s" : ""}
                    </div>
                </div>
            </div>
        </form>
    );
}

export default App;
