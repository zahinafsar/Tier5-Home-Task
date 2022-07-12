import React, { useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  MouseSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from '../../components/SortItem';
import {
  ArcElement,
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler,
} from 'chart.js';
import { Pie, Line, Bar, Radar } from 'react-chartjs-2';
import { CountrySegment } from '../../components/SegmentCard/Country';
import { DeviceSegment } from '../../components/SegmentCard/Device';
import { GenderSegment } from '../../components/SegmentCard/Gender';
import { IDashboardProp } from '../../interface/IDashboard';
import { useCustomDispatch, useCustomSelector } from '../../store';
import { setGlobalStore } from '../../store/reducers/global';
import ActiveUsersTable from '../../components/ActiveUsersTable';
import { get_usage_table_data } from '../../api/dashboard';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  RadialLinearScale,
  Filler,
);

const backgroundColors = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)',
]

const borderColors = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
]

export default function App() {
  const { dashboard: items } = useCustomSelector(state => state.global)
  const [graphData, setGraphData] = React.useState({
    labels: [],
    datasets: [
      {
        label: 'Daily Active Hours',
        data: [],
        axisY: {
          suffix: "k"
        },
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    getGraphData();
  }, [])

  const getGraphData = async () => {
    const { data } = await get_usage_table_data()
    setGraphData((prev: any) => ({
      labels: data.data.usage.map((item: any) => item.year),
      datasets: [{
        ...prev.datasets[0],
        data: data.data.usage.map((item: any) => item.totalUsage),
      }]
    }))
  }

  const dispatch = useCustomDispatch()

  const setItems = (data: IDashboardProp[]) => {
    dispatch(setGlobalStore({
      dashboard: data
    }))
  }

  const removeItem = (id: string | number) => {
    const filteredItem = items.filter(itemData => itemData.id !== id)
    setItems(filteredItem)
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((data: any) => data.id)}
        strategy={rectSortingStrategy}
      >
        <Grid>
          {items.map(({ id, type, category, value }: any) => (
            <SortableItem isTable={type === 'table'} removeItem={removeItem} key={id} id={id}>
              {
                type === 'pie' ? (
                  <Pie data={graphData} />
                ) : type === 'line' ? (
                  <Line data={graphData} />
                ) : type === 'bar' ? (
                  <Bar data={graphData} />
                ) : type === 'radar' ? (
                  <Radar data={graphData} />
                ) : type === 'table' ? (
                  <ActiveUsersTable />
                ) : type === 'segment' ?
                  category === 'country' ? (
                    <CountrySegment id={id} value={value} />
                  ) : category === 'device' ? (
                    <DeviceSegment id={id} value={value} />
                  ) : category === 'gender' ? (
                    <GenderSegment id={id} value={value} />
                  ) : null : null
              }
            </SortableItem>
          ))}
        </Grid>
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;
    const oldIndex = items.findIndex(({ id }) => id === active.id);
    const newIndex = items.findIndex(({ id }) => id === over.id);
    if (active.id !== over.id) {
      const newArray = arrayMove(items, oldIndex, newIndex);
      setItems(newArray);
    }
  }
}

function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      {children}
    </div>
  );
}
