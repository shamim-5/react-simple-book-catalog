import { IBooks } from "@/types/globalTypes";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";

import { Avatar, List, Space } from "antd";
import React from "react";

interface BestBooksProps {
  data: IBooks[];
}

const BestBooks: React.FC<BestBooksProps> = ({ data }) => {
  const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  return (
    <div>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 10,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            actions={[
              <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
              <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
              <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
            ]}
            extra={<img width={272} alt="logo" src={`${item.image}`} />}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href={`books/${item.id}`}>{item.title}</a>}
              description={
                <div>
                  <h3>
                    Author: <span>{item.author}</span>
                  </h3>
                  <p>
                    Genre: <span>{item.genre}</span>
                  </p>
                  <p>
                    Publication Date: <span>{item.publication_date}</span>
                  </p>
                </div>
              }
            />

            {item.description}
          </List.Item>
        )}
      />
    </div>
  );
};

export default BestBooks;
