import {
  collection,
  Firestore,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

export default class UserDataSource {
  private store: Firestore;

  private collectionName = 'Users';

  constructor(store: Firestore) {
    this.store = store;
  }

  async fetchAllUser(currentUserUid: string) {
    const q = query(
      collection(this.store, this.collectionName),
      where('uid', '!=', currentUserUid),
    );

    const users = await getDocs(q);

    return users;
  }
}
