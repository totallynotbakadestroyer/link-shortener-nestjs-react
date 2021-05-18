import * as mongoose from 'mongoose';

export const generateLinksAggregationPipeline = (
  user: any,
  id: string | number | null = null,
) => {
  const match: any = { creator: mongoose.Types.ObjectId(user.id) };
  if (id) match._id = mongoose.Types.ObjectId(id);
  return [
    {
      $match: match,
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
              createdAt: 1,
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
          { $unwind: { path: '$visitors', preserveNullAndEmptyArrays: true } },
          {
            $group: {
              _id: null,
              totalAllTime: {
                $sum: {
                  $cond: [
                    {
                      $gt: [
                        '$visitors.createdAt',
                        new Date(new Date(0).getTime()),
                      ],
                    },
                    1,
                    0,
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
          {
            $sort: {
              date: 1,
            },
          },
        ],
      },
    },
    { $unwind: { path: '$total', preserveNullAndEmptyArrays: false } },
  ];
};

export const defaultResult = {
  links: [],
  devices: [],
  os: [],
  browsers: [],
  total: {
    totalAllTime: 0,
    total30Days: 0,
    total7Days: 0,
    totalToday: 0,
  },
  clicksByDay: [],
};
