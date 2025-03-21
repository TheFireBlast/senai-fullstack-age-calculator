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
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        return {
            years: Math.floor(diffDays / 365),
            months: Math.floor((diffDays % 365) / 30),
            days: diffDays % 30,
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
        return (
            isNaN(info.day) ||
            isNaN(info.month) ||
            isNaN(info.year) ||
            info.day == 0 ||
            info.month == 0 ||
            info.year == 0 ||
            isNaN(new Date(info.year, info.month - 1, info.day).getTime())
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
    // const [auto, setAuto] = useState(false);

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
                        className="cursor-pointer rounded-full bg-purple-600 p-2"
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
