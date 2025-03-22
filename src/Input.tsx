interface Props {
    className?: string;
    name: string;
    content: string;
    placeholder?: string;
    error?: string | boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export default function Input({
    className,
    name,
    content,
    placeholder,
    error,
    onChange,
}: Props) {
    return (
        <div
            className={"flex flex-col gap-1 " + (className || "")}
            data-error={error ? "true" : undefined}
        >
            <label
                htmlFor={name}
                className="tracking-widest text-neutral-600 in-data-error:text-red-400"
            >
                {name}
            </label>
            <input
                type="text"
                id={name}
                name={name}
                onChange={onChange}
                value={content}
                placeholder={placeholder}
                className="min-w-0 rounded-md border border-black/20 p-2 text-2xl transition outline-none hover:border-purple-600 focus:border-purple-600 in-data-error:border-red-400"
            />
            {error && typeof error == "string" && (
                <div className="text-sm text-red-400 italic">{error}</div>
            )}
        </div>
    );
}
