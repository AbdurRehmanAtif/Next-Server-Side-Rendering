import ShowPersonalAccountDetails from './accountDetails/show';
import ProfileContainer from './container';
import React from 'react';


// Define your Profile component
export default async function Page() {
  return (
    <>
      <ProfileContainer>
        <ShowPersonalAccountDetails />
        <ShowPersonalAccountDetails />
        <ShowPersonalAccountDetails />
      </ProfileContainer>
    </>
  )
}
