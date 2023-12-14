import React, { useState, useRef, useEffect } from "react";
import { Form, Button, Card, Input, Typography, Select } from "antd";
import { Upload } from "antd";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import gregorian_ru from "./gregorian_ru";

import { beforeUpload, convertToBase64 } from "../../utils/uploadImage";
const CreateTournamentForm = ({ form }: any): JSX.Element => {
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
    console.log(`selected ${value}`);
    form.setFieldsValue({ city: null });
  };

  const onSearchCountry = (value: string) => {
    console.log("search:", value);
  };

  const onChangeCity = (value: string) => {
    console.log(`selected City ${value}`);
  };

  const onSearchCity = (value: string) => {
    console.log("search City:", value);
  };

  return (
    <Form
      form={form}
      name="createToutnament"
      autoComplete="off"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 19 }}
      style={{ width: 800 }}
    >
      <Form.Item
        name="title"
        label="Название турнира"
        rules={[
          {
            required: true,
            message: "Пожалуйста введите название турнира",
          },
          {
            whitespace: true,
            message: "Название турнира не может быть пустым",
          },
          {
            min: 3,
            message: "Название турнира должно быть больше 3 символов",
          },
        ]}
        hasFeedback
      >
        <Input placeholder="Придумайте название турнира" />
      </Form.Item>

      <Form.Item
        name="country"
        label="Страна"
        rules={[
          {
            required: true,
            message: "Пожалуйста выберите страну проведения турнира",
          },
        ]}
      >
        <Select
          allowClear
          showSearch
          placeholder="Выберите страну"
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
        <Form.Item name="city" label="Город" rules={[
          {
            required: true,
            message: "Пожалуйста выберите город проведения турнира",
          },
        ]}>
          <Select
            allowClear
            showSearch
            placeholder="Выберите город"
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
      <Form.Item name="description" label="Описание турнира">
        <Input.TextArea placeholder="Напишите описание турнира" />
      </Form.Item>
      {/* <Form.Item
        name="team_logo"
        label="Логотип турнира"
        valuePropName="fileList"
        getValueFromEvent={(event) => {
          return event?.fileList;
        }}
      >
        <Upload
          name="tournament_logo"
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
      </Form.Item> */}
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

export default CreateTournamentForm;
