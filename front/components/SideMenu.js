import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined, SkinOutlined, TagOutlined, UserOutlined, UploadOutlined } from '@ant-design/icons';
import { Menu, Switch, Upload, Button, Modal } from 'antd';
import { MIDDLEWARE_REACT_LOADABLE_MANIFEST } from 'next/dist/shared/lib/constants';
const items = [
    {
        key: 'sub1',
        label: '후드티/티 One',
        icon: <SkinOutlined />,
        children: [
            { key: '1', label: '사계절 후드티' },
            { key: '2', label: '기모 후드티' },
            { key: '3', label: '수영/판초/비치' },
            { key: '4', label: '티셔츠' },
        ],
    },
    {
        key: 'sub2',
        label: '맨투맨',
        icon: <AppstoreOutlined />,
        children: [
            { key: '5', label: '무지 맨투맨' },
            { key: '6', label: '스타일 맨투맨' },
            {
                key: 'sub3',
                label: 'Submenu',
                children: [
                    { key: '7', label: '후드 셋트' },
                    { key: '8', label: '맨투맨 셋트' },
                ],
            },
        ],
    },
    {
        key: 'sub4',
        label: '하위/기타 의류',
        icon: <TagOutlined />,
        children: [
            { key: '9', label: '남여 공용 바지' },
            { key: '10', label: '남여 공용 반바지 10' },
            { key: '11', label: '헬스용 셋트' },
            { key: '12', label: '기타/커스텀' },
        ],
    },
];
const PUBLIC_IMAGES = [
    "hoodie_mw1.png",
    "hoodie_mw2.png",
    "dark_hoodie_01.png",
    "dark_hoodie_04.png",
    "hoodie_m_black.png",
    "hoodie_w_black.png",
    "hoodie_w_green.png",
    "hoodie_w_pink.png",
    "thejoa.png",
    "google.png",
    "kakao.png",
    "naver.png",
    "ChatGPT Image 2026년 1월 30일 오후 12_50_57.png"
];

const SideMenu = ({isAdmin}) => {
    const [theme, setTheme] = useState('dark');
    const [current, setCurrent] = useState('1');
    const [bannerImage, setBannerImage] = useState('blob:http://localhost:3000/0cda5f7d-03ee-4b1b-a102-0c73222ea066');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const changeTheme = value => {
        setTheme(value ? 'dark' : 'light');
    };
    const onClick = e => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    const handleImageSelect = (filename) => {
        setBannerImage(`/images/${filename}`);
        setIsModalOpen(false);
    };

    return (
        <>
            <Switch
                checked={theme === 'dark'}
                onChange={changeTheme}
                checkedChildren="Dark"
                unCheckedChildren="Light"
            />
            <br />
            <br />
            <Menu
                theme={theme}
                onClick={onClick}
                style={{ width: 256, background: '#AEC6CF' }}
                defaultOpenKeys={['sub1']}
                selectedKeys={[current]}
                mode="inline"
                items={items}
            />
            <div style={{ padding: 16, position: 'sticky', top: 10, zIndex: 999 }}>
                {/* Image Upload Trigger */}
                {/* <div style={{ marginBottom: 8, textAlign: 'right' }}>
                    <Button
                        size="small"
                        onClick={() => setIsModalOpen(true)}
                        style={{ fontSize: '12px', marginRight: '5px' }}
                    >
                        이미지 목록
                    </Button>
                    <Upload
                        showUploadList={false}
                        beforeUpload={(file) => {
                            const url = URL.createObjectURL(file);
                            setBannerImage(url);
                            return false; // Prevent default upload
                        }}
                    >
                        <Button size="small" icon={<UploadOutlined />} style={{ fontSize: '12px' }}>변경</Button>
                    </Upload>
                </div> */}

                                    
                        <div style={{ marginBottom: 8, textAlign: 'right' }}>
                            {isAdmin && (
                            <Button
                                size="small"
                                onClick={() => setIsModalOpen(true)}
                                style={{ fontSize: '12px', marginRight: '5px' }}
                            >
                                이미지 목록
                            </Button>
                            )}
                            <Upload
                                showUploadList={false}
                                beforeUpload={(file) => {
                                    const url = URL.createObjectURL(file);
                                    setBannerImage(url);
                                    return false;
                                }}
                            >
                               
                                <Button
                                    size="small"
                                    icon={<UploadOutlined />}
                                    style={{ fontSize: '12px' }}
                                >
                                    변경
                                </Button>
                               
                            </Upload>
                        </div>
                   


                <a
                    href="https://www.lotteon.com/csearch/search/search?render=search&platform=pc&q=%EB%B8%8C%EB%9E%9C%EB%93%9C%ED%9B%84%EB%93%9C%ED%8B%B0&mallId=1"
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    <div
                        className="firefly-effect"
                        style={{
                            width: '100%',
                            height: 200,
                            background: '#fff',
                            borderRadius: 8,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer'
                        }}>
                        {bannerImage ? (
                            <img src={bannerImage} alt="Advertisement" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }} />
                        ) : (
                            <span style={{ color: '#888', fontWeight: 'bold' }}>광고 배너 영역</span>
                        )}
                    </div>
                </a>
            </div>

            <Modal
                title="배너 이미지 선택"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                width={600}
            >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                    {PUBLIC_IMAGES.map((img) => (
                        <div
                            key={img}
                            onClick={() => handleImageSelect(img)}
                            style={{
                                cursor: 'pointer',
                                border: '1px solid #eee',
                                borderRadius: '4px',
                                overflow: 'hidden',
                                height: '100px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <img
                                src={`/images/${img}`}
                                alt={img}
                                style={{ maxWidth: '100%', maxHeight: '100%' }}
                            />
                        </div>
                    ))}
                </div>
            </Modal>
        </>
    );
};
export default SideMenu;
