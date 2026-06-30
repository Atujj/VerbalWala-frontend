export default function ResultSection({
    title,
    children,
}) {
    return (
        <section className="space-y-5">
            <h2 className="text-2xl font-bold">
                {title}
            </h2>

            {children}
        </section>
    );
}