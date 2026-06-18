type StatusBadgeProps = {
    status: "PENDING" | "CONFIRMED" | "FINISHED";
};

const statusConfig = {
    PENDING: {
        label: "Pendiente",
        className: "border-yellow-500/30 bg-yellow-500/10 text-yellow-300",
    },
    CONFIRMED: {
        label: "Confirmado",
        className: "border-green-500/30 bg-green-500/10 text-green-300",
    },
    FINISHED: {
        label: "Finalizado",
        className: "border-blue-500/30 bg-blue-500/10 text-blue-300",
    },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
    const config = statusConfig[status];

    return (
        <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${config.className}`}>
            {config.label}
        </span>
    );
}