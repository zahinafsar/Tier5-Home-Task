import { useEffect, useState } from "react";
import { Table } from "rsuite";
import { get_most_active_users } from "../api/dashboard";
const { Column, HeaderCell, Cell } = Table;

const ActiveUsersTable = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const { data } = await get_most_active_users();
    setUsers(data.data.mostActiveUser);
  }

  return (
    <Table virtualized height={360} data={users}>
      <Column width={200}>
        <HeaderCell>Username</HeaderCell>
        <Cell dataKey='username' />
      </Column>
      <Column width={200}>
        <HeaderCell>Country</HeaderCell>
        <Cell dataKey='country' />
      </Column>
      <Column width={200}>
        <HeaderCell>Daily Active Hours</HeaderCell>
        <Cell dataKey='activeHours.today' />
      </Column>
      <Column width={200}>
        <HeaderCell>Weekly Active Hours</HeaderCell>
        <Cell dataKey='activeHours.thisWeek' />
      </Column>
      <Column width={200}>
        <HeaderCell>Monthly Active Hours</HeaderCell>
        <Cell dataKey='activeHours.thisMonth' />
      </Column>
    </Table>
  );
};

export default ActiveUsersTable;
