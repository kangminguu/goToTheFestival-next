import EmptyFavoriteList from "./components/EmptyFavoriteList";

export function generateMetadata() {
    return {
        title: "찜한 축제 - 축제가자",
        description: "찜한 축제를 확인할 수 있습니다.",
    };
}

export default function FavoritesPage() {
    return (
        <div className="min-max-padding min-h-[400px]">
            <EmptyFavoriteList />
        </div>
    );
}
