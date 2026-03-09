"use client";

import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import {
  fetchInstagramReels,
  fetchAllInstagramReels,
  addInstagramReel,
  deleteInstagramReel,
  updateInstagramReelDisplay,
  updateInstagramReelSeq,
} from "@/features/slices/instagramReelSlice";

import Card from "@/admin/components/card/Card";
import CardHeading from "@/admin/components/card/CardHeading";
import TableContainer from "@/admin/components/table/TableContainer";

import { normalizeListResponse } from "@/admin/utils/helper";
import { toast } from "react-toastify";

interface ReelRow {
  id: string;
  reelId: string;
  thumbnail_url: string;
  seq: number;
  isDisplay: boolean;
}

const InstagramPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const { reels, allReels, loading } = useAppSelector(
    (state) => state.instagramReels
  );

  useEffect(() => {
    dispatch(fetchInstagramReels());
    dispatch(fetchAllInstagramReels());
  }, [dispatch]);

  const { rows: reelRows, pagination } =
    normalizeListResponse<ReelRow>(reels, 10);
const [seqDrafts, setSeqDrafts] = React.useState<Record<string, number>>({});
 const handleAdd = async (reelId: string) => {
  try {
    const formData = new FormData();
    formData.append("reelId", reelId);

    await dispatch(addInstagramReel({ data: formData })).unwrap();

    toast.success("Reel added");

    dispatch(fetchInstagramReels());
  } catch {
    toast.error("Failed to add reel");
  }
};

  const handleDelete = async (item: ReelRow) => {
    try {
      await dispatch(deleteInstagramReel({ id: item.id })).unwrap();

      toast.success("Reel removed");

      dispatch(fetchInstagramReels());
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleSearch = (term: string) => {
    dispatch(
      fetchInstagramReels({
        params: { search: term || undefined },
      })
    );
  };

  const ReelTable = TableContainer<ReelRow>;

const reelIds = useMemo(
  () => new Set(reels.map((r) => r.reelId)),
  [reels]
);

const filteredCards = useMemo(
  () => allReels.filter((card) => !reelIds.has(card.id)),
  [allReels, reelIds]
);


  return (
    <section className="p-6 space-y-6">
    

      <Card className="max-h-[500px] overflow-y-auto">
        <CardHeading>Instagram Reels</CardHeading>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredCards?.map((reel: any) => (
            <div
              key={reel.reelId}
              className="border rounded-lg p-3 flex flex-col items-center"
            >
              <img
                src={reel.thumbnail_url}
                alt="reel"
                className="w-full h-40 object-cover rounded"
              />

              <button
                onClick={() => handleAdd(reel.id)}
                disabled={loading}
                className="mt-3 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          ))}
        </div>
      </Card>

      

      <Card>
        <CardHeading>Selected Instagram Reels</CardHeading>

        <ReelTable
          head={[
            {
              key: "thumbnail_url",
              label: "Thumbnail",
              render: (row) => (
                <img
                  src={row.thumbnail_url}
                  className="w-16 h-16 object-cover rounded"
                />
              ),
            },
			 {
      key: "isDisplay",
      label: "Display",
      render: (row) => (
        <select
          value={String(row.isDisplay)}
          onChange={async (e) => {
            const value = e.target.value === "true";

            try {
              await dispatch(
                updateInstagramReelDisplay({
                  itemId: row.id,
                  isDisplay: value,
                })
              ).unwrap();

              toast.success("Display updated");
            } catch {
              toast.error("Update failed");
            }
          }}
          className="border rounded px-5 py-1 text-smfont-bold bg-gray-900"
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      ),
    },
	    {
      key: "seq",
      label: "Sequence",
      render: (row) => {
        const currentValue =
          seqDrafts[row.id] ?? row.seq ?? 0;

        return (
          <input
            type="number"
            value={currentValue}
            onChange={(e) => {
              const value = Number(e.target.value);

              setSeqDrafts((prev) => ({
                ...prev,
                [row.id]: value,
              }));
            }}
            onKeyDown={async (e) => {
              if (e.key !== "Enter") return;

              const value =
                seqDrafts[row.id] ?? row.seq ?? 0;

              if (value === row.seq) return;

              try {
                await dispatch(
                  updateInstagramReelSeq({
                    itemId: row.id,
                    seq: value,
                  })
                ).unwrap();

                toast.success("Sequence updated");
              } catch {
                toast.error("Failed to update sequence");
              }
            }}
            className="border rounded px-2 py-1 w-20 text-sm"
          />
        );
      },
	}
          ]}
          data={reelRows}
          pagination={pagination}
          currentPage={pagination.page}
          handlePageChange={(p) =>
            dispatch(
              fetchInstagramReels({
                params: {
                  page: p,
                  limit: pagination.limit,
                },
              })
            )
          }
          onDelete={handleDelete}
          onSearch={handleSearch}
          searchPlaceholder="Search reels..."
        />
      </Card>
    </section>
  );
};

export default InstagramPage;