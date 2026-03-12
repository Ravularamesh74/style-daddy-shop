import { useState } from "react";
import { Tag, Loader2, Check, X } from "lucide-react";

type CouponInputProps = {
  onApply: (code: string) => Promise<boolean>;
  onRemove?: () => void;
};

const CouponInput = ({ onApply, onRemove }: CouponInputProps) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState("");

  const handleApply = async () => {
    if (!code.trim()) return;

    setLoading(true);
    setError("");

    try {
      const valid = await onApply(code);

      if (valid) {
        setApplied(true);
      } else {
        setError("Invalid coupon code");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    setCode("");
    setApplied(false);
    setError("");
    onRemove?.();
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-3">

      <label className="text-sm font-semibold flex items-center gap-2">
        <Tag size={16} />
        Coupon Code
      </label>

      <div className="flex gap-2">

        <input
          type="text"
          value={code}
          disabled={applied}
          placeholder="Enter coupon"
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          className="flex-1 px-3 py-2 border border-border rounded-md outline-none focus:ring-2 focus:ring-primary"
        />

        {!applied ? (
          <button
            onClick={handleApply}
            disabled={loading}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2"
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              "Apply"
            )}
          </button>
        ) : (
          <button
            onClick={handleRemove}
            className="px-4 py-2 bg-destructive text-white rounded-md flex items-center gap-2"
          >
            <X size={16} />
            Remove
          </button>
        )}

      </div>

      {applied && (
        <p className="text-green-600 flex items-center gap-1 text-sm">
          <Check size={14} />
          Coupon applied successfully
        </p>
      )}

      {error && (
        <p className="text-red-500 text-sm">
          {error}
        </p>
      )}
    </div>
  );
};

export default CouponInput;