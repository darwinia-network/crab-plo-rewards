import React from 'react';
import { Spin } from 'antd';

export const PageLoading: React.FC = () => (
  <div className="w-screen h-screen flex justify-center items-center pb-32">
    <Spin size="large" tip="Page Loading ..." />
  </div>
);
