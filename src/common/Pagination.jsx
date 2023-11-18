"use client";

import React from "react";
import Link from "next/link";


const Pagination = ({ pageNumber, activePage, currentPage, totalPages, totalData }) => {
  return (
    <div className=" d-flex justify-content-between">
      <div>
        Total Data: {totalData}
      </div>
      <div class="pagination float-right pagination-sm border">
        {
          currentPage - 3 >= 1 && (
              <Link className=" text-primary px-2 border-left py-1" href={`/Admin/admin_page_list/admin_page_list_all?page=${1}`}>‹ First</Link>
          )
        }
        {
          currentPage > 1 && (
              <Link className=" text-primary px-2 border-left py-1" href={`/Admin/admin_page_list/admin_page_list_all?page=${activePage - 1}`}>&lt;</Link>
          )
        }
        {
          pageNumber.map((page) =>
              <Link
              key={page}
                href={`/Admin/admin_page_list/admin_page_list_all?page=${page}`}
                className={` ${page === activePage ? "font-bold bg-primary px-2 border-left py-1 text-white" : "text-primary px-2 border-left py-1"}`}
              > {page}
              </Link>
          )
        }
        {
          currentPage < totalPages && (
              <Link className=" text-primary px-2 border-left py-1" href={`/Admin/admin_page_list/admin_page_list_all?page=${activePage + 1}`}>&gt;</Link>
          )
        }
        {
          currentPage + 3 <= totalPages && (  
              <Link className=" text-primary px-2 border-left py-1" href={`/Admin/admin_page_list/admin_page_list_all?page=${totalPages}`}>Last ›</Link>
          )
        }
      </div>

    </div>



  );
};

export default Pagination;




