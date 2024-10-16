// pages/index.tsx
import { GetServerSideProps } from 'next';
import { getDatabase } from './api/NotionDB';
import Link from 'next/link';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';


interface NotionDatabaseProps {
  pages: PageObjectResponse[]; 
}

export const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID_PAGE; 

export const getServerSideProps: GetServerSideProps<NotionDatabaseProps> = async () => {
  

  if (!databaseId) {
    console.error('Database ID is not defined in environment variables.');
    return {
      props: {
        pages: [],
      },
    };
  }


  try {
    const pages = await getDatabase(databaseId);
    console.log(pages);

    return {
      props: {
        pages,
      },
    };
  } catch (error) {
    console.error('Error fetching Notion database:', error);
    return {
      props: {
        pages: [],
      },
    };
  }
};

const NotionDatabase: React.FC<NotionDatabaseProps> = ({ pages }) => {
  return (
    <div>
      <h1>Notion Database</h1>
      {pages && pages.length > 0 ? (
      <ul>
        {pages.map((page: any) => (
          <li key={page.id}>
            <Link href={`/${page.id}`}>
                {page.properties.title?.title?.[0]?.text.content || 'Untitled'}
            </Link>
          </li>
        ))}
      </ul>
      ) : (
        <p>No pages available.</p>
      )}
    </div>
  );
};

export default NotionDatabase;
