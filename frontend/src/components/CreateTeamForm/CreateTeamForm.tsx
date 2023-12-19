import React, { useState, useRef, useEffect } from "react";
import { Form, Button, Card, Input, Typography, Select } from "antd";
import { Upload } from "antd";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import gregorian_ru from "./gregorian_ru";

import { beforeUpload, convertToBase64 } from "../../utils/uploadImage";
const CreateTeamForm = ({ form }: any): JSX.Element => {
  const [imageBase, setBaseImage] = useState<string | null>(null);
  // const [fileList, setFileList] = useState<[string | RcFile | Blob]>();
  const [country, setCountry] = useState<undefined | string>(undefined);
  const [selectDates, setSelectDates] = useState<any>([]);
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const onChangeCountry = (value: string) => {
    setCountry(value);
    form.setFieldsValue({ city: null });
  };

  const onSearchCountry = (value: string) => {
  };

  const onChangeCity = (value: string) => {
  };

  const onSearchCity = (value: string) => {
  };

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

      <Form.Item
        name="country"
        label="Страна команды"
        rules={[
          {
            required: true,
            message: "Пожалуйста выберите страну",
          },
        ]}
      >
        <Select
          allowClear
          showSearch
          placeholder="Выберите страну команды"
          optionFilterProp="children"
          onChange={onChangeCountry}
          onSearch={onSearchCountry}
          filterOption={filterOption}
          options={[
            {
              value: "Russia",
              label: "Россия",
            },
            {
              value: "France",
              label: "Франция",
            },
            {
              value: "China",
              label: "Китай",
            },
          ]}
        />
      </Form.Item>
      {country && (
        <Form.Item name="city" label="Город команды" rules={[
          {
            required: true,
            message: "Пожалуйста выберите город",
          },
        ]}>
          <Select
            allowClear
            showSearch
            placeholder="Выберите город команды"
            optionFilterProp="children"
            onChange={onChangeCity}
            onSearch={onSearchCity}
            filterOption={filterOption}
            options={[
              {
                value: "Moscow",
                label: "Москва",
              },
              {
                value: "Voronezh",
                label: "Воронеж",
              },
              {
                value: "Minsk",
                label: "Минск",
              },
            ]}
          />
        </Form.Item>
      )}
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
      <Form.Item
        name="ban_dates"
        valuePropName="value"
        label="Запрещенные даты"
      >
        <DatePicker
          value={selectDates}
          onChange={setSelectDates}
          multiple
          format="DD.MM.YYYY"
          plugins={[<DatePanel />]}
          style={{ width: "100%" }}
          containerStyle={{
            width: "100%",
          }}
          placeholder="Выберите запрещенные даты для игр"
          locale={gregorian_ru}
        />
      </Form.Item>
    </Form>
  );
};

export default CreateTeamForm;
