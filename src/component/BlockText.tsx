import React from 'react';
import styled from "styled-components";

const BlockText = ({ blocks }: { blocks: any }) => {
  return (
    
      <Sdiv>
        {blocks.map((block: any) => {
          switch (block.type) {
            case 'paragraph':
              return (
                <Sp key={block.id}>
                  {block.paragraph.rich_text.map((text: any, index: any) => (
                    <span key={index}>{text.plain_text}</span>
                  ))}
                </Sp>
              );
              case "heading_1":
                return (
                  <Sh1 key={block.id}>
                    {block.heading_1.rich_text.map((text: any, index: any) => (
                    <span key={index}>{text.plain_text}</span>
                    ))}
                  </Sh1>
                );
              case "heading_2":
                return (
                  <Sh2 key={block.id}>
                    {block.heading_2.rich_text.map((text: any, index: any) => (
                    <span key={index}>{text.plain_text}</span>
                    ))}
                  </Sh2>
                );
              case "heading_3":
                return (
                  <Sh3 key={block.id}>
                    {block.heading_3.rich_text.map((text: any, index: any) => (
                    <span key={index}>{text.plain_text}</span>
                    ))}
                  </Sh3>
                );
              case "image":
                const src = block.image?.file?.url || "";
                const caption = block.image.caption.length > 0 ? block.image.caption[0]?.plain_text : "";
                return (
                  <figure>
                    <Simg src={src} alt={caption} />
                    {caption && <figcaption>{caption}</figcaption>}
                  </figure>
               );
                           
            default:
              return <div key={block.id}>Unknown block type</div>;
          }
        })}
      </Sdiv>
    
  );
};


const Simg = styled.img`
    width: 60%;
`;

const Sdiv = styled.div`
    padding-left: 10%;
    padding-right: 10%;
`;

const Sp = styled.p`
    font-size: 20px;
`;

const Sh2 = styled.h2`
    font-size: 32px;
`;

const Sh1 = styled.h1`
    font-size: 38px;
`;

const Sh3 = styled.h3`
    font-size: 26px;
`;

export default BlockText;
