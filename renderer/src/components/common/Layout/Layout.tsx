import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import Menu from '../Menu/Menu';
import * as S from './Layout.styles';

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <S.Wrapper>
      <S.MenuWrapper>
        <Menu />
      </S.MenuWrapper>

      <S.ContentsWrapper>{children}</S.ContentsWrapper>
    </S.Wrapper>
  );
}
