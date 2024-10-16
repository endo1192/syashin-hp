import 'next';
import Cheader from '../component/header';
import { GetServerSideProps } from 'next';
import BlockText from '../component/BlockText';
import Link from 'next/link';
import { Client } from '@notionhq/client';

// Notion APIクライアントの初期化
const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_API_KEY });

// SSRでデータを取得
export const getServerSideProps: GetServerSideProps = async () => {
    
    const textid = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID_PAGE

    if (!textid) {
      throw new Error('NOTION_ABOUT_KEY is not defined in the environment variables');
    }
  
    
  
    try {
      const response = await notion.blocks.children.list({
        block_id: textid,
      });

      return {
          props: {
              database: response.results,
          },
      };
    } catch (error) {
      const errorMessage = (error as Error).message || 'An error occurred';
      return {
        props: {
          database: [],
          error: errorMessage,
        },
      };
    }
};

interface PageContactProps {
    database: any;
};

export default function Contact({ database }: PageContactProps) {
  return (
    <div>
      <Cheader />
      <p>Contact</p>     
      <BlockText blocks={database} />
      {database && database.length > 0 ? (
      <ul>
        {database.map((page: any) => (
          <li key={page.id}>
            <Link href={`/${page.id}`}>
                {page.properties.title.title[0]?.text.content || 'Untitled'}
            </Link>
          </li>
        ))}
      </ul>
      ) : (
        <p>No pages available.</p>
      )}
    </div>
  );
}
