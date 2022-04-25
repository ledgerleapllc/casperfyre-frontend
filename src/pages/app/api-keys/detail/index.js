import ApiLogs from 'pages/app/api-logs';
// import WalletsHistory from 'pages/app/wallets';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from 'shared/components/partials';
import withPageSetting from 'shared/HOC/withPageSetting';
import { getAPIKey } from 'stores/app/actions';
// import ApiCalls from '../apiCalls';
// import WalletsHistory from '../wallet';
// import WhiteListedIP from '../whitelistedIP';
const BREADCRUMB_DATA = [
  {
    label: 'API Keys',
    href: '/app/api-keys',
  },
  {
    label: 'Detail View',
  },
];

const ApiKeysDetail = ({ config }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    config.setBreadcrumb(BREADCRUMB_DATA);
  }, []);

  useEffect(() => {
    fetchAPIKey(id);
  }, [id]);

  const fetchAPIKey = (id) => {
    //TODO: Update api
    dispatch(
      getAPIKey(
        {
          id,
        },
        (res) => {},
        (err) => {}
      )
    );
  };

  return (
    <section className='section-api-keys-detail'>
      <div className='section-body pt-6'>
        <p className='section-title text-sm font-semibold'>General Actions</p>
        <div className='button-actions flex gap-x-5 pt-7.5'>
          {['Reset Portal Password', 'Disable Key', 'Replace Key', 'Change Wallet'].map((text, index) => (
            <Button key={index} size='sm' className='rounded-full w-48'>
              {text}
            </Button>
          ))}
        </div>
        <div className='section-content pt-12.5 flex flex-col gap-y-6'>
          <p className='text-sm font-semibold'>User Details</p>
          <div className='flex gap-y-3 flex-col'>
            {[
              {
                title: 'User ID',
                value: '1',
              },
              {
                title: 'Email',
                value: 'useremail@gmail.com',
              },
              {
                title: 'Activation Date',
                value: '2022-03-31 09:37:53',
              },
              {
                title: 'Daily CSPR Limit',
                value: '5000',
                onUpdate: () => console.log('update'),
              },
              {
                title: 'Per TX CSPR Limit',
                value: '500',
                onUpdate: () => console.log('update'),
              },
              {
                title: 'Receiving Wallet Address',
                value: '0x24232fdq32435gwefde',
              },
              {
                title: 'Total API calls',
                value: '1568',
              },
              {
                title: 'Total CSPR Sent',
                value: '206,915',
              },
            ].map((user, index) => (
              <div key={index} className='flex gap-x-3'>
                <p className='text-sm'>{user.title}: </p>
                <p className='text-sm font-semibold'>{user.value}</p>
                {user.onUpdate && (
                  <Button size='xs' className='rounded-full' onClick={user.onUpdate}>
                    Update
                  </Button>
                )}
              </div>
            ))}
          </div>
          {/* <WhiteListedIP /> */}
          <ApiLogs />
          {/* <WalletsHistory /> */}
        </div>
      </div>
    </section>
  );
};

export default withPageSetting(ApiKeysDetail);
