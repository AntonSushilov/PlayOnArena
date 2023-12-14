import React, { useState, useEffect } from "react";
import { Form, Button, Card, Input, Typography } from "antd";
import { Upload } from "antd";

import { beforeUpload, convertToBase64 } from "../../utils/uploadImage";
const CreateTeamForm = ({ form }: any): JSX.Element => {
  // const [loading, setLoading] = useState(false);

  const [imageBase, setBaseImage] = useState<string | null>(null);
  // const [fileList, setFileList] = useState<[string | RcFile | Blob]>();

  return (
    <Form
      form={form}
      name="createTeam"
      autoComplete="off"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 19 }}
      style={{ width: 800 }}
    >
      <Form.Item
        name="title"
        label="Название команды"
        rules={[
          {
            required: true,
            message: "Пожалуйста введите название команды",
          },
          {
            whitespace: true,
            message: "Название команды не может быть пустым",
          },
          {
            min: 3,
            message: "Название команды должно быть больше 3 символов",
          },
        ]}
        hasFeedback
      >
        <Input placeholder="Придумайте название команды" />
      </Form.Item>

      <Form.Item name="country" label="Страна команды">
        <Input placeholder="Введите страну команды" />
      </Form.Item>
      <Form.Item name="city" label="Город команды">
        <Input placeholder="Введите город команды" />
      </Form.Item>
      <Form.Item name="description" label="Описание команды">
        <Input.TextArea placeholder="Напишите описание команды" />
      </Form.Item>
      <Form.Item
        name="team_logo"
        label="Логотип команды"
        valuePropName="fileList"
        getValueFromEvent={(event) => {
          return event?.fileList;
        }}
      >
        <Upload
          name="team_logo"
          listType="picture-card"
          maxCount={1}
          // className="avatar-uploader"
          showUploadList={false}
          customRequest={async (info) => {
            console.log(info);
            const base64: any = await convertToBase64(info.file);
            setBaseImage(base64);
            // setFileList([info.file]);
          }}
          beforeUpload={beforeUpload}
          // onChange={handleChange}
          // fileList={fileList}
        >
          {imageBase ? (
            <img style={{ width: "100%" }} src={`${imageBase}`} />
          ) : (
            "Загрузить"
          )}
        </Upload>
      </Form.Item>
    </Form>
  );
};

export default CreateTeamForm;
