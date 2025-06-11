import DetailHeader from "./components/DetailHeader";

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
        <div className="min-max-padding">
            <DetailHeader/>

            
        </div>
    );
}
