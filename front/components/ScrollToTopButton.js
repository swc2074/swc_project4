import React, { useState, useEffect } from 'react';
import { UpOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled upto given height
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Set the top cordinate to 0
    // make scrolling smooth
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <>
            {isVisible && (
                <div style={{ position: 'fixed', bottom: '50px', right: '50px', zIndex: 1000 }}>
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<UpOutlined />}
                        size="large"
                        onClick={scrollToTop}
                        style={{
                            backgroundColor: '#1890ff',
                            borderColor: '#1890ff',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            width: '50px',
                            height: '50px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    />
                </div>
            )}
        </>
    );
};

export default ScrollToTopButton;
