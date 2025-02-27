export default function Options({value, text}) {
    return (
        <>
            <option value={value}>
                {text}
            </option>
        </>
    );
}