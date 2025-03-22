interface Props {
    className?: string;
    name: string;
    content: string;
    placeholder?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export default function Input({
    className,
    name,
    content,
    placeholder,
    onChange,
}: Props) {
    return (
        <div className={"flex flex-col gap-1 " + (className || "")}>
            <label htmlFor={name} className="text-neutral-600 tracking-widest">{name}</label>
            <input
                type="text"
                id={name}
                name={name}
                onChange={onChange}
                value={content}
                placeholder={placeholder}
                className="min-w-0 rounded-md border border-black/20 p-2 text-2xl transition outline-none hover:border-purple-600 focus:border-purple-600"
            />
        </div>
    );
}
