export class Favorites {
  protected favorites: string[] = [];

  isFavorites(id: string): boolean {
    return Boolean(this.favorites.includes(id));
  }

  addToFavorites(id: string) {
    return (this.favorites = [...new Set([...this.favorites, id])]);
  }

  deleteFromFavorites(id: string) {
    return (this.favorites = this.favorites.filter(
      (entryId) => entryId !== id,
    ));
  }
}
