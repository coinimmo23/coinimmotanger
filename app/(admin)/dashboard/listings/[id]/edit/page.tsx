import { getListingById } from "@/lib/supabase/queries";
import ListingForm from "@/components/admin/ListingForm";
import { notFound } from "next/navigation";

export const metadata = { title: "Modifier l'annonce" };

export default async function EditListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getListingById(id);

  if (result.error || !result.data) notFound();

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Modifier l'annonce</h1>
        <p className="page-sub">{result.data.title}</p>
      </div>

      <ListingForm listing={result.data} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@600&display=swap');
        .page { font-family: 'DM Sans', sans-serif; max-width: 900px; }
        .page-header { margin-bottom: 28px; }
        .page-title  { font-family: 'Playfair Display', serif; font-size: 28px; color: #f0f0f0; margin-bottom: 4px; }
        .page-sub    { font-size: 14px; color: #555; }

        @media (max-width: 768px) {
          .page { max-width: 100%; }
          .page-header { margin-bottom: 20px; }
          .page-title  { font-size: 24px; }
          .page-sub    { font-size: 13px; }
        }
        @media (max-width: 480px) {
          .page-title  { font-size: 20px; }
          .page-sub    { font-size: 12px; }
        }
      `}</style>
    </div>
  );
}