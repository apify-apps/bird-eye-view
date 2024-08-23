import Loading from '@/components/common/loading/Loading';
import { API_ROUTE } from '@/constant/api-route';
import { TransjakartaCorridorDetailResponse } from '@/model/response/transjakarta';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { PT_Sans } from 'next/font/google';
import React from 'react'
import TransjakartaScheduleIcon from './TransjakartaScheduleIcon';

const ptSans = PT_Sans({ weight: '700', subsets: ['latin'] });
export type TransjakartaCorridorDetailProps = {
  code: string
}

export default function TransjakartaCorridorDetail(props: TransjakartaCorridorDetailProps) {
  const { isLoading, data } = useQuery({
    queryKey: [`transjakarta-code-detail`, props.code],
    enabled: !!props.code && props.code.length > 0,
    queryFn: async () => {
      let j = await request<TransjakartaCorridorDetailResponse, {}>({
        method: "GET",
        url: API_ROUTE.TRANSJAKARTA.CORRIDOR + `/${props.code}`,
      });
      return (j?.data);
    }
  });

  if (isLoading || !data) return (
    <div className='p-4'><Loading/></div>
  )

  return (
    <>
      <div className='grid grid-cols-[7fr_3fr]'>
        <h1 className={classNames('text-4xl font-bold p-3 flex items-center', ptSans.className)}>{data.name}</h1>
        <h1 className={classNames('text-6xl font-bold p-3 text-center align-middle flex items-center justify-center', ptSans.className)} style={{ backgroundColor: data.color }}>{data.code}</h1>
      </div>
      <hr />
      <div className='flex flex-col p-6 gap-6'>
        {
          data.schedule.map((schedule, idx) => (
            <div key={idx}>
              <div className='flex gap-5'>
                { schedule.weekday && <TransjakartaScheduleIcon icon='weekday'/> }
                { schedule.weekend && <TransjakartaScheduleIcon icon='weekend'/> }
                { schedule.day && <TransjakartaScheduleIcon icon='day'/> }
                { schedule.night && <TransjakartaScheduleIcon icon='night'/> }
                { schedule.peakDay && <TransjakartaScheduleIcon icon='peakday'/> }
                { schedule.peakEvening && <TransjakartaScheduleIcon icon='peakevening'/> }
              </div>
              <div>
                {/* Start */}
                <div>

                </div>

                {/* End */}
                <div>

                </div>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}
