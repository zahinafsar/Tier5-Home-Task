import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
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
import { IDashboardItem, IDashboardProp } from '../../interface/IDashboard';

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

const data = {
  labels: ['10 july', '11 july', '12 july', '13 july', '14 july', '15 july', '16 july', '17 july', '18 july', '19 july', '20 july'],
  datasets: [
    {
      label: 'Daily Active Hours',
      data: [90, 60, 80, 30, 80, 90, 70, 80, 90, 100, 110],
      axisY: {
        suffix: "k"
      },
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

export default function App({ items, setItems, removeItem }: { items: IDashboardProp[], setItems: any, removeItem: any }) {

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
        items={items.map(({ id }: any) => id)}
        strategy={rectSortingStrategy}
      >
        <Grid>
          {items.map(({ id, type, category, value }: any) => (
            <SortableItem removeItem={removeItem} key={id} id={id}>
              {
                type === 'pie' ? (
                  <Pie data={data} />
                ) : type === 'line' ? (
                  <Line data={data} />
                ) : type === 'bar' ? (
                  <Bar data={data} />
                ) : type === 'radar' ? (
                  <Radar data={data} />
                ) : type === 'segment' ?
                  category === 'country' ? (
                    <CountrySegment value={value} />
                  ) : category === 'device' ? (
                    <DeviceSegment value={value} />
                  ) : category === 'gender' ? (
                    <GenderSegment value={value} />
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

    if (active.id !== over.id) {
      setItems((item: any) => {
        const oldIndex = items.findIndex(({ id }) => id === active.id);
        const newIndex = items.findIndex(({ id }) => id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
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
