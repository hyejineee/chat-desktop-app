import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { LoginArgsType, RegisterUserArgsType } from '@type/auth';
import {
  collection,
  doc,
  Firestore,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';

export default class AuthDataSource {
  private firebaseAuth: Auth;

  private firebaseStore: Firestore;

  private collectionName = 'Users';

  constructor(auth: Auth, store: Firestore) {
    this.firebaseAuth = auth;
    this.firebaseStore = store;
  }

  /**
   * 회원가입
   * @param args 가입할 회원의 정보
   */
  async registerUser({ email, password, nickName }: RegisterUserArgsType) {
    try {
      const duplicated = await this.checkNickNameDuplication(nickName);

      if (duplicated) throw Error('이미 존재하는 닉네임입니다.');

      const { user } = await createUserWithEmailAndPassword(
        this.firebaseAuth,
        email,
        password,
      );

      await this.saveUser(email, user.uid, nickName);
    } catch (e) {
      if (e instanceof Error) {
        throw Error(this.changeErrorMessage(e.message));
      }
    }
  }

  /**
   * 파이어 베이스 에러 메세지를 한글로 전환
   * @param message
   * @returns 한글 에러 메세지
   */
  private changeErrorMessage(message: string) {
    if (message.includes('이미 존재하는 닉네임입니다.')) return message;
    if (message.includes('(auth/email-already-in-use)'))
      return '이미 존재하는 계정입니다.';
    return '오류가 발생했습니다. 관리자에게 문의하세요.';
  }

  /**
   * 파이어 베이스 디비에 회원 정보 저장
   * @param email
   * @param uid
   * @param nickName
   */
  private async saveUser(email: string, uid: string, nickName: string) {
    await setDoc(doc(this.firebaseStore, this.collectionName, uid), {
      email,
      nickName,
      rooms: [],
    });
  }

  /**
   * 닉네임 중복 확인
   * @param nickName
   * @returns 중복 여부
   */
  private async checkNickNameDuplication(nickName: string) {
    const q = query(
      collection(this.firebaseStore, this.collectionName),
      where('nickName', '==', nickName),
    );

    const users = await getDocs(q);

    console.log(users.size);

    return users.size !== 0;
  }
}
