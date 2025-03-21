interface Props {
    name: string;
    content: string;
    placeholder?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export default function Input({ name, content, placeholder, onChange }: Props) {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={name}>{name}</label>
            <input
                type="text"
                id={name}
                name={name}
                onChange={onChange}
                value={content}
                placeholder={placeholder}
                className="rounded-md border border-black/20 p-2 text-2xl transition outline-none hover:border-purple-600 w-40"
            />
        </div>
    );
}
