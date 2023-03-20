import Head from 'next/head';

export async function getStaticProps() {
  // {
  //   "data": {
  //     "repository": {
  //       "issue": {
  //         "reactionGroups": [
  //           { "content": "THUMBS_UP", "users": { "totalCount": 0 } },
  //           { "content": "THUMBS_DOWN", "users": { "totalCount": 0 } },
  //           { "content": "LAUGH", "users": { "totalCount": 0 } },
  //           { "content": "HOORAY", "users": { "totalCount": 0 } },
  //           { "content": "CONFUSED", "users": { "totalCount": 0 } },
  //           { "content": "HEART", "users": { "totalCount": 0 } },
  //           { "content": "ROCKET", "users": { "totalCount": 0 } },
  //           { "content": "EYES", "users": { "totalCount": 0 } }
  //         ]
  //       }
  //     }
  //   }
  // }
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify({
      query: `query {
        repository(owner:"mangopieface", name:"mac-next-demo") {
          issue(number:1) {
            reactionGroups {
              content
              users(first: 0) {
                totalCount
              }
            }
          }
        }
      }`,
    }),
  });

  const json = await res.json();
  if (res.status !== 200) {
    console.error(json);
    throw new Error('Failed to fetch API');
  }

  const reactions = json.data.repository.issue.reactionGroups.map(
    (item) => item.users.totalCount
  );

  return {
    props: {
      reactions,
    },
    revalidate: 10,
  };
}

const ISRPageExample = ({ reactions }) => {
  return (
    <div className="container">
      <Head>
        <title>Static Reactions Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h2>Static Reactions Demo</h2>
        <h3>
          Reactions on{' '}
          <a href="https://github.com/MangoPieface/mac-next-demo/issues/1">
            https://github.com/MangoPieface/mac-next-demo/issues/1
          </a>
          :
        </h3>
        <div className="line">
          <span className="emoji">👍</span> <strong>{reactions[0]}</strong>
        </div>
        <div className="line">
          <span className="emoji">👎</span> <strong>{reactions[1]}</strong>
        </div>
        <div className="line">
          <span className="emoji">😄</span> <strong>{reactions[2]}</strong>
        </div>
        <div className="line">
          <span className="emoji">🎉</span> <strong>{reactions[3]}</strong>
        </div>
        <div className="line">
          <span className="emoji">😕</span> <strong>{reactions[4]}</strong>
        </div>
        <div className="line">
          <span className="emoji">🧡</span> <strong>{reactions[5]}</strong>
        </div>
        <div className="line">
          <span className="emoji">🚀</span> <strong>{reactions[6]}</strong>
        </div>
        <div className="line">
          <span className="emoji">👀</span> <strong>{reactions[7]}</strong>
        </div>
      </main>
    </div>
  );
}

export default ISRPageExample