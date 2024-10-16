import 'next';
import { GetServerSideProps } from 'next';
import Cheader from '../component/header';
import BlockText from '../component/BlockText';

// SSRでデータを取得
export const getServerSideProps: GetServerSideProps = async () => {
    
    const textid = process.env.NEXT_PUBLIC_NOTION_ABOUT_KEY

    if (!textid) {
      throw new Error('NOTION_ABOUT_KEY is not defined in the environment variables');
    }
  
    if (!textid || typeof textid !== 'string') {
      return {
        props: {
          blocks: [],
          error: 'Invalid textid',
        },
      };
    }
  
    try {
      const response = await fetch(`/api/NotionAPI?textid=${textid}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch blocks');
      }
  
      const data = await response.json();
  
      return {
        props: {
          blocks: data.blocks,
        },
      };
    } catch (error) {
      const errorMessage = (error as Error).message || 'An error occurred';
      return {
        props: {
          blocks: [],
          error: errorMessage,
        },
      };
    }
};

interface PageAboutProps {
    blocks: any;
};

export default function About({ blocks }: PageAboutProps) {
  return (
    <div>
      <Cheader />
      <p>About</p>
      <BlockText blocks={blocks} />
    </div>
  );
}
