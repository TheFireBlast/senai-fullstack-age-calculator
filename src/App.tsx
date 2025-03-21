import { useState } from "react";
import Input from "./Input";

interface DateInfo {
    year: number;
    month: number;
    day: number;
}
interface Age {
    years: number;
    months: number;
    days: number;
}

function useAge(
    initialInfo: DateInfo,
    now: Date,
): [Age, (info: DateInfo) => void] {
    const calcAge = (date: Date) => {
        const diff = Math.floor(now.getTime() - date.getTime());
        const day = 1000 * 60 * 60 * 24;

        const days = Math.floor(diff / day);
        const months = Math.floor(days / 31);
        const years = Math.floor(months / 12);

        return {
            days: days % 30,
            months: months % 12,
            years,
        };
    };
    const setDate = (info: DateInfo) => {
        if (isInvalid(info)) {
            setAge({ years: NaN, months: NaN, days: NaN });
            return;
        }
        const date = new Date(info.year, info.month - 1, info.day);
        setAge(calcAge(date));
    };
    const isInvalid = (info: DateInfo) => {
        const time = new Date(
            `${info.year}-${info.month}-${info.day}`,
        ).getTime();
        return (
            isNaN(info.day) ||
            isNaN(info.month) ||
            isNaN(info.year) ||
            info.day == 0 ||
            info.month == 0 ||
            info.year == 0 ||
            isNaN(time) ||
            time > now.getTime()
        );
    };

    const [age, setAge] = useState({ years: NaN, months: NaN, days: NaN });

    if (isInvalid(initialInfo)) {
        return [{ years: NaN, months: NaN, days: NaN }, setDate];
    }

    return [age, setDate];
}

function App() {
    const now = new Date();

    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    const [{ years, months, days }, updateAge] = useAge(
        { year: 2000, month: 1, day: 1 },
        now,
    );

    return (
        <div className="flex min-h-screen w-screen items-center justify-center bg-gray-100">
            <div className="rounded-2xl bg-white p-8 shadow-2xl">
                <div className="flex gap-4">
                    <Input
                        name="DAY"
                        content={day}
                        onChange={(e) => setDay(e.target.value.trim())}
                        placeholder={"DD"}
                    />
                    <Input
                        name="MONTH"
                        content={month}
                        onChange={(e) => setMonth(e.target.value.trim())}
                        placeholder={"MM"}
                    />
                    <Input
                        name="YEAR"
                        content={year}
                        onChange={(e) => setYear(e.target.value.trim())}
                        placeholder={"YYYY"}
                    />
                </div>
                <div className="my-4 flex items-center gap-4">
                    <div className="h-px grow border-t border-t-black/40"></div>
                    <button
                        onClick={() => {
                            updateAge({
                                year: parseInt(year),
                                month: parseInt(month),
                                day: parseInt(day),
                            });
                        }}
                        className="cursor-pointer rounded-full bg-purple-600 p-2 transition hover:bg-purple-500"
                    >
                        <img
                            className="size-8"
                            src={"assets/images/icon-arrow.svg"}
                            alt="ENTER"
                        />
                    </button>
                </div>
                <div>
                    <div className="text-2xl font-bold italic">
                        <span className="text-purple-800">
                            {isNaN(years) ? "--" : years}
                        </span>{" "}
                        years
                    </div>
                    <div className="text-2xl font-bold italic">
                        <span className="text-purple-800">
                            {isNaN(months) ? "--" : months}
                        </span>{" "}
                        months
                    </div>
                    <div className="text-2xl font-bold italic">
                        <span className="text-purple-800">
                            {isNaN(days) ? "--" : days}
                        </span>{" "}
                        days
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
