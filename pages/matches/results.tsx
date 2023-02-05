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
import { getAllLatestMatches } from '../../services/Match.service';

const ResultsMatchesPage: NextPage<IFutureMatchesPage> = ({ data }) => {
  const [search, setSearch] = useState<TSearchMatches>({});
  const { setTab } = useTab();
  const { setMatches } = useMatches();

  useEffect(() => {
    if (search?.championship || search?.edition) {
      setMatches(
        data.filter(
          ({ championshipId, editionId }) =>
            (search?.championship && Number(search?.championship) === championshipId && !search?.edition) ||
            (search?.edition && Number(search?.edition) === editionId && !search?.championship) ||
            (search?.edition && search?.championship && Number(search?.edition) === editionId && Number(search?.championship) === championshipId)
        )
      );
    } else {
      setMatches(data);
    }
  }, [data, setMatches, search]);

  useEffect(() => {
    setTab({ tabId: 1, title: 'Rezultate', href: '/matches/results', value: 1 });
  }, [setTab]);

  return (
    <Layout {...{ bgColor: 'var(--blue-500)' }}>
      <MatchesHeader {...{ setSearch, isUsedInMatchPage: true }} />
      <MatchesList />
    </Layout>
  );
};
export default ResultsMatchesPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const session = await getSession(ctx);
    const { data } = await getAllLatestMatches();
    return {
      props: {
        session,
        data: data.map(
          ({ club_firstId, club_secondId, score_first, score_second, ...rest }: TBEMatch) =>
            ({ ...rest, clubOneId: club_firstId, clubTwoId: club_secondId, scoreClubOne: score_first, scoreClubTwo: score_second } as TMatch)
        ),
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
