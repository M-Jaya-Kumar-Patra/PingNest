import {
  getDashboardSummary,
  getErrorDistribution,
  getRecentRequests,
  getRequestsTimeline,
  getTopEndpoints,
  getSlowestEndpoints,
  getHealthScore,
  getAllRequests,
  getErrorDetails,
} from "../services/analytics.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const dashboardSummaryController = asyncHandler(async (req, res) => {
  const summary = await getDashboardSummary(req.params.projectId, req.user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, summary, "Dashboard summary fetched"));
});


export const recentRequestsController =
  asyncHandler(async (req, res) => {

    const requests =
      await getRecentRequests(
        req.params.projectId,
        req.user._id
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        requests,
        "Recent requests fetched"
      )
    );

  });

  export const topEndpointsController =
  asyncHandler(async (req, res) => {

    const endpoints =
      await getTopEndpoints(
        req.params.projectId,
        req.user._id
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        endpoints,
        "Top endpoints fetched"
      )
    );

  });

  export const errorDistributionController =
  asyncHandler(async (req, res) => {

    const errors =
      await getErrorDistribution(
        req.params.projectId,
        req.user._id
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        errors,
        "Error distribution fetched"
      )
    );

  });


  export const requestsTimelineController =
 asyncHandler(async(req,res)=>{

   const data =
     await getRequestsTimeline(
       req.params.projectId,
       req.user._id
     );

   return res.status(200).json(
     new ApiResponse(
       200,
       data,
       "Timeline fetched"
     )
   );
});

export const slowestEndpointsController =
 asyncHandler(async(req,res)=>{

   const data =
     await getSlowestEndpoints(
       req.params.projectId,
       req.user._id
     );

   return res.status(200).json(
     new ApiResponse(
       200,
       data,
       "Slowest endpoints fetched"
     )
   );
});

export const healthScoreController =
 asyncHandler(async(req,res)=>{

   const score =
     await getHealthScore(
       req.params.projectId,
       req.user._id
     );

   return res.status(200).json(
     new ApiResponse(
       200,
       { score },
       "Health score fetched"
     )
   );
});


export const allRequestsController =
  asyncHandler(
    async (req, res) => {
      const data =
        await getAllRequests(
          req.params.projectId,
          req.user._id,
          req.query
        );

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            data,
            "Requests fetched"
          )
        );
    }
  );


  export const errorDetailsController =
  asyncHandler(
    async (req, res) => {
      const data =
        await getErrorDetails(
          req.params.projectId,
          req.user._id
        );

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            data,
            "Error details fetched"
          )
        );
    }
  );