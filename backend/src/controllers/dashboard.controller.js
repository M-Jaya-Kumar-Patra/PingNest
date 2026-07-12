import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  getDashboardOverview,
} from "../services/dashboard.service.js";

export const dashboardOverviewController =
  asyncHandler(
    async (req, res) => {

      const data =
        await getDashboardOverview(
          req.user._id
        );

      return res.status(200).json(
        new ApiResponse(
          200,
          data,
          "Dashboard overview fetched"
        )
      );

    }
  );