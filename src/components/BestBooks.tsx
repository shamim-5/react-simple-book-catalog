import { IBooks } from "@/types/globalTypes";
import { Avatar, List } from "antd";
import React from "react";

interface BestBooksProps {
  data: IBooks[];
}

const BestBooks: React.FC<BestBooksProps> = ({ data }) => {
  return (
    <div>
      <List
        className=""
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
            className="flex flex-col-reverse lg:flex-row"
            key={item.title}
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
