import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import { NextPage } from 'next/types';
import { useEffect, useState } from 'react';
import { IFutureMatchesPage, TBEMatch, TMatch, TSearchMatches } from '../../components/matches/Interfaces';
import MatchesHeader from '../../components/matches/MatchesHeader';
import MatchesList from '../../components/matches/MatchesList';
import Layout from '../../components/shared/Layout';
import { useMatches } from '../../context/ContextMatch';
import { useTab } from '../../context/ContextTab';
import { getAllFeatureMatches } from '../../services/Match.service';

const FutureMatchesPage: NextPage<IFutureMatchesPage> = ({ data }) => {
  const [search, setSearch] = useState<TSearchMatches>({});
  const { setTab } = useTab();
  const { setMatches } = useMatches();

  useEffect(() => {
    if (search?.championship || search?.edition) {
      //to-do
    } else {
      setMatches(data);
    }
  }, [data, setMatches, search]);

  useEffect(() => {
    setTab({ tabId: 0, title: 'Meciuri viitoare', href: '/matches', value: 0 });
  }, [setTab]);

  return (
    <Layout {...{ bgColor: 'var(--blue-500)' }}>
      <MatchesHeader {...{ setSearch }} />
      <MatchesList />
    </Layout>
  );
};
export default FutureMatchesPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const session = await getSession(ctx);
    const { data } = await getAllFeatureMatches();
    return {
      props: {
        session,
        data: data.map(({ club_firstId, club_secondId, ...rest }: TBEMatch) => ({ ...rest, clubOneId: club_firstId, clubTwoId: club_secondId } as TMatch)),
      },
    };
  } catch (e) {
    return {
      props: {
        session: {},
        data: [],
      },
    };
  }
};
