import { CreateNewPassword } from '@/pagesComponents';
import { getNonAuthorizedLayout } from '@/shared/providers';

export default function Page() {
  return (
    <>
      <CreateNewPassword />
    </>
  );
}
Page.getLayout = getNonAuthorizedLayout;
