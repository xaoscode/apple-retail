interface ApiErrorProps {
    error: string | undefined
}

export function ApiErrors({ error }: ApiErrorProps): JSX.Element | null {
    if (!error) return null;
    return <div>{ error }</div>;
}