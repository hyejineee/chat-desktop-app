import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { LoginArgsType, RegisterUserArgsType, UserType } from '@type/auth';
import {
  collection,
  doc,
  Firestore,
  getDocs,
  query,
  setDoc,
  where,
  getDoc,
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
   * 로그인
   * @param 이메일, 비밀번호
   */
  async login({ email, password }: LoginArgsType) {
    try {
      await signInWithEmailAndPassword(this.firebaseAuth, email, password);
    } catch (e) {
      if (e instanceof Error) {
        throw Error(this.changeErrorMessage(e.message));
      }
    }
  }

  /**
   * 현재 사용자가 로그인 되어 있는지 확인
   * @returns 로그인 되어 있는 사용자 계정 정보
   */
  checkLoggedIn() {
    return this.firebaseAuth.currentUser;
  }

  /**
   * 사용자 전체 데이터 가져오기
   * @param uid 사용자의 uid
   * @returns 사용자의 전체 데이터
   */
  async fetchUser(uid: string) {
    const user = await getDoc(
      doc(this.firebaseStore, this.collectionName, uid),
    );

    if (!user.exists()) throw Error('유저 정보를 찾을 수 없습니다.');

    return { ...user.data(), uid } as UserType;
  }

  /**
   * 로그아웃
   */
  async logout() {
    await signOut(this.firebaseAuth);
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

    if (message.includes('(auth/user-not-found)'))
      return '존재하지 않는 사용자입니다.';

    if (message.includes('(auth/wrong-password)'))
      return '이메일 또는 비밀번호가 일치하지 않습니다.';

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

    return users.size !== 0;
  }
}
