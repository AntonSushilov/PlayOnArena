import React from 'react'
import { Form, Button, Typography } from "antd";
const {Title} = Typography
function EditTeamForm({viewEditForm}: any) {
  return (
    <div>
      <Title>В разработке</Title>
      <Button onClick={viewEditForm}>Отменить</Button>
    </div>
  )
}

export default EditTeamForm