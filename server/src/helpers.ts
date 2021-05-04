import * as mongoose from 'mongoose';

export const generateLinksAggregationPipeline = (user: any) => {
  return [
    {
      $match: { creator: mongoose.Types.ObjectId(user.id) },
    },
    {
      $lookup: {
        from: 'visitors',
        localField: '_id',
        foreignField: 'link',
        as: 'visitors',
      },
    },
    {
      $facet: {
        links: [
          {
            $project: {
              _id: 0,
              id: '$_id',
              shortenedLink: 1,
              to: 1,
              visitorsCount: { $size: '$visitors' },
            },
          },
        ],
        devices: [
          { $unwind: '$visitors' },
          {
            $group: {
              _id: '$visitors.deviceType',
              total: { $sum: 1 },
            },
          },
          {
            $project: {
              _id: 0,
              name: '$_id',
              total: 1,
            },
          },
        ],
        os: [
          { $unwind: '$visitors' },
          {
            $group: {
              _id: '$visitors.os',
              total: { $sum: 1 },
            },
          },
          {
            $project: {
              _id: 0,
              name: '$_id',
              total: 1,
            },
          },
        ],
        browsers: [
          { $unwind: '$visitors' },
          {
            $group: {
              _id: '$visitors.browser',
              total: { $sum: 1 },
            },
          },
          {
            $project: {
              _id: 0,
              name: '$_id',
              total: 1,
            },
          },
        ],
        total: [
          { $unwind: '$visitors' },
          {
            $group: {
              _id: null,
              totalAllTime: {
                $sum: {
                  $cond: [
                    {
                      $eq: ['$visitors.createdAt', null], //FIXME: thats really awful what am i thinking should fix ASAP
                    },
                    0,
                    1,
                  ],
                },
              },
              total30Days: {
                $sum: {
                  $cond: [
                    {
                      $gt: [
                        '$visitors.createdAt',
                        new Date(new Date().getTime() - 1000 * 3600 * 24 * 30),
                      ],
                    },
                    1,
                    0,
                  ],
                },
              },
              total7Days: {
                $sum: {
                  $cond: [
                    {
                      $gt: [
                        '$visitors.createdAt',
                        new Date(new Date().getTime() - 1000 * 3600 * 24 * 7),
                      ],
                    },
                    1,
                    0,
                  ],
                },
              },
              totalToday: {
                $sum: {
                  $cond: [
                    {
                      $gt: [
                        '$visitors.createdAt',
                        new Date(new Date().getTime() - 1000 * 3600 * 24),
                      ],
                    },
                    1,
                    0,
                  ],
                },
              },
            },
          },
          {
            $project: {
              _id: 0,
              total30Days: 1,
              total7Days: 1,
              totalToday: 1,
              totalAllTime: 1,
            },
          },
        ],
        clicksByDay: [
          { $unwind: '$visitors' },
          {
            $match: {
              'visitors.createdAt': {
                $gt: new Date(new Date().getTime() - 1000 * 3600 * 24 * 30),
              },
            },
          },
          {
            $group: {
              _id: {
                $dateToString: {
                  format: '%Y-%m-%d',
                  date: '$visitors.createdAt',
                },
              },
              count: { $sum: 1 },
            },
          },
          {
            $project: {
              _id: 0,
              date: '$_id',
              count: 1,
            },
          },
        ],
      },
    },
    { $unwind: '$total' },
  ];
};
