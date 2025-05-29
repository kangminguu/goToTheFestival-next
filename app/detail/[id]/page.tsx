interface DetailPageParams {
    params: { id: string };
}

export async function generateMetadata({ params }: DetailPageParams) {
    const id = (await params).id;

    return {
        title: id,
    };
}

export default async function DetailPage({ params }: DetailPageParams) {
    const id = (await params).id;

    return (
        <div className="min-w-[320px] max-w-[1200px] mx-auto">
            <h3>{id} Detail Page</h3>
        </div>
    );
}
