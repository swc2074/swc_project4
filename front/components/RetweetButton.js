import React from "react";
import { RetweetOutlined } from "@ant-design/icons";  
import { Spin, message } from "antd";

 
export default function RetweetButton( ) {
  const handleClick = () => {
    if (!user) {
      message.error("로그인한 사용자만 리트윗할 수 있습니다.");
      window.location.href = "/login";
      return;
    }
    if (loading) return;
    onToggleRetweet(postId, isRetweeted);
  };

  return (
    <div
 
      style={{  
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
 
        <Spin size="small" />
 
        <RetweetOutlined
          style={{
            fontSize: "20px",
            color: isRetweeted ? "green" : "#555",
          }}
        />
 
      <div style={{ fontSize: "12px", marginTop: "4px" }}>
        리트윗 {retweetCount || 0}
      </div>
    </div>
  );
}
