import React from 'react'
import { Form, Button, Typography } from "antd";
const {Title} = Typography
function EditProfileForm({viewEditForm}: any) {
  return (
    <div>
      <Title>В разработке</Title>
      <Button onClick={viewEditForm}>Отменить</Button>
    </div>
  )
}

export default EditProfileForm