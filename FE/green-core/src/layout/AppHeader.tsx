import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AppButton from '@/components/button/AppButton';
import { useAppDispatch, useAppSelector } from '@/core/hooks';

import { getAuth as GitHubGetAuth, signInWithPopup as GitHubSignInWithPopup, GithubAuthProvider, signOut as GitHubSignOut } from 'firebase/auth';
import { getAuth as GoogleGetAuth, signInWithPopup as GoogleSignInWithPopup, GoogleAuthProvider, signOut as GoogleSignOut } from 'firebase/auth';
import { logOut } from '@/core/user/userAPI';
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';

import styles from './AppHeader.module.scss';
import Skeleton from 'react-loading-skeleton';
import { useRouter } from 'next/router';
import { checkIsAlert } from '@/core/alert/alertAPI';

export default function AppHeader() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const storage = getStorage();

  const nickname = useAppSelector((state) => state.common?.userInfo?.nickname);
  const isAlert = useAppSelector((state) => state.common?.isAlert);

  const [userProfileImagePath, setUserProfileImagePath] = useState<string>('');

  // github
  const githubAuth = GitHubGetAuth();
  const githubProvider = new GithubAuthProvider();

  // google
  const googleAuth = GoogleGetAuth();
  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    if (nickname) {
      getUserProfile();
      handleIsAlertCheck();
    }
  }, [nickname, userProfileImagePath]);

  /** 사용자 프로필 이미지 가져오는 함수 */
  function getUserProfile() {
    const profileRef = ref(storage, `${nickname}/profileImage`);

    getDownloadURL(profileRef)
      .then((downloadURL) => {
        setUserProfileImagePath(downloadURL);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  /** 알림 체크하기 기능 */
  async function handleIsAlertCheck() {
    try {
      dispatch(checkIsAlert(nickname));
    } catch (error) {
      console.error(error);
    }
  }

  /** 로그아웃: github, kakao, google, jwt */
  async function handleLogOut() {
    try {
      dispatch(logOut());
    } catch (error) {
      console.error(error);
    }

    GitHubSignOut(githubAuth)
      .then(() => {
        console.log('github sign out!');
        // dispatch(SET_IS_OAUTH_FALSE());
      })
      .catch((error) => {
        console.error(error);
      });

    GoogleSignOut(googleAuth)
      .then(() => {
        console.log('google sign out!');
        // dispatch(SET_IS_OAUTH_FALSE());
      })
      .catch((error) => {
        console.error(error);
      });

    window.Kakao.Auth.logout()
      .then(async function () {
        console.log('kakao sign out!');
        console.log(window.Kakao.Auth.getAccessToken());

        // const params = {
        // 	client_id: kakaoConfig.restApiKey,
        // 	logout_redirect_uri: kakaoConfig.logOutRedirectUri
        // };

        // await axios.get(`https://kauth.kakao.com/oauth/logout`, {params});
        // alert('logout ok\naccess token -> ' + window.Kakao.Auth.getAccessToken());
        // dispatch(SET_IS_OAUTH_FALSE());
        // dispatch(logOut(accessToken));
      })
      .catch(function () {
        console.log('Not kakao logged in');
      });

    router.push('/');
  }

  return (
    <>
      <div className={`${styles.container} xl:w-56 w-20 flex-none fixed overflow-hidden h-full px-3 py-5`}>
        <div className='flex flex-col justify-between h-full xl:px-4'>
          <div className='flex flex-col items-center xl:items-start'>
            <div className=' flex mb-10'>
              <Image src='/images/leaf4.png' width={32} height={32} className={`xl:hidden block`} alt='logo' />
              <Link href='/' className={`${styles.title} xl:block hidden`}>
                GREENCORE
              </Link>
            </div>

            <div className={`${styles.navContainer} flex flex-col space-y-7`}>
              {nickname ? (
                <>
                  <Link href='/home'>
                    <div className='flex items-center space-x-3'>
                      <span className='material-symbols-outlined'>home</span>
                      <span className='xl:block hidden'>Home</span>
                    </div>
                  </Link>

                  <Link href='/plant/docs'>
                    <div className='flex items-center space-x-3'>
                      {/* <span className='material-symbols-outlined'>search</span> */}
                      <span className='material-symbols-outlined'>auto_stories</span>
                      <span className='xl:block hidden'>식물 도감</span>
                    </div>
                  </Link>

                  <Link href='/plant/disease'>
                    <div className='flex items-center space-x-3'>
                      <span className='material-symbols-outlined'>bug_report</span>
                      <span className='xl:block hidden'>병충해 분석</span>
                    </div>
                  </Link>

                  <Link href='/schedule'>
                    <div className='flex items-center space-x-3 '>
                      <span className='material-symbols-outlined'>calendar_month</span>
                      <span className='xl:block hidden'>식물 스케줄링</span>
                    </div>
                  </Link>

                  <Link href={`/user/following/${nickname}`}>
                    <div className='flex items-center space-x-3'>
                      <span className='material-symbols-outlined'>group</span>
                      <span className='xl:block hidden'>팔로우 관리</span>
                    </div>
                  </Link>

                  <Link href={`/user/bookmark/${nickname}`}>
                    <div className='flex items-center space-x-3'>
                      <span className='material-symbols-outlined'>book</span>
                      <span className='xl:block hidden'>북마크</span>
                    </div>
                  </Link>

                  <Link href={`/user/alert/${nickname}`}>
                    <div className='flex items-center space-x-3'>
                      {isAlert ? <span className='material-symbols-outlined fill-small like'>fiber_manual_record</span> : null}
                      <span className='material-symbols-outlined'>notifications</span>
                      <span className='xl:block hidden'>알림</span>
                    </div>
                  </Link>

                  <Link href='/user/settings/password'>
                    <div className='flex items-center space-x-3'>
                      <span className='material-symbols-outlined'>settings</span>
                      <span className='xl:block hidden'>설정</span>
                    </div>
                  </Link>
                </>
              ) : (
                <>
                  <Link href='/'>
                    <div className='flex items-center space-x-3'>
                      <span className='material-symbols-outlined'>home</span>
                      <span className='xl:block hidden'>Home</span>
                    </div>
                  </Link>

                  <Link href='/'>
                    <div className='flex items-center space-x-3'>
                      {/* <span className='material-symbols-outlined'>search</span> */}
                      <span className='material-symbols-outlined'>auto_stories</span>
                      <span className='xl:block hidden'>식물 도감</span>
                    </div>
                  </Link>

                  <Link href='/'>
                    <div className='flex items-center space-x-3'>
                      <span className='material-symbols-outlined'>bug_report</span>
                      <span className='xl:block hidden'>병충해 분석</span>
                    </div>
                  </Link>

                  <Link href='/auth/login'>로그인</Link>

                  <Link href='/auth/signup'>회원가입</Link>
                </>
              )}
            </div>
          </div>

          {nickname ? (
            <>
              <div className='gap-3'>
                <div className='flex flex-col items-center'>
                  {userProfileImagePath ? (
                    <Image src={userProfileImagePath} width={50} height={50} className='border rounded-full xl:hidden' alt='' />
                  ) : (
                    <div className='xl:hidden'>
                      <Skeleton width={50} height={50} circle />
                    </div>
                  )}
                </div>
                <Link href={`/user/feed/${nickname}`}>
                  <div className='flex mb-3 w-50 items-center rounded-full hover:bg-gray-100 p-3 gap-2'>
                    {userProfileImagePath ? (
                      <Image src={userProfileImagePath} width={50} height={50} className='border rounded-full xl:block hidden' alt='' />
                    ) : (
                      <div className='xl:block hidden'>
                        <Skeleton width={50} height={50} circle />
                      </div>
                    )}
                    <div className='xl:block hidden'>
                      <div className='font-bold text-ellipsis overflow-hidden text-sm xl:block hidden'>{nickname}</div>
                    </div>
                  </div>
                </Link>

                <div className='xl:block hidden'>
                  <AppButton text='로그아웃' handleClick={handleLogOut} bgColor='thin' className='mb-3 mt-3 xl:block hidden' />
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}
