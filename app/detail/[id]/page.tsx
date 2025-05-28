interface DetailPageParams {
    params: { id: string };
}

export default function DetailPage({ params }: DetailPageParams) {
    return (
        <div>
            <h3>{params.id} Detail Page</h3>
        </div>
    );
}
