import { c as createLucideIcon, i as useParams, r as reactExports, j as jsxRuntimeExports, K as Key, B as Button } from "./index-BC_BpiJv.js";
import { j as useGetKey, k as useSubmitReturnRequest, e as isKeyReturned, S as Skeleton, C as CircleCheck, L as Label, I as Input } from "./useRequests-BtpamvOB.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
const MapPin = createLucideIcon("map-pin", __iconNode);
function FinderPage() {
  const { keyId: keyIdParam } = useParams({ from: "/find/$keyId" });
  const keyId = (() => {
    try {
      return BigInt(keyIdParam);
    } catch {
      return null;
    }
  })();
  const { data: key, isLoading, isError } = useGetKey(keyId);
  const submitRequest = useSubmitReturnRequest();
  const [finderName, setFinderName] = reactExports.useState("");
  const [finderContact, setFinderContact] = reactExports.useState("");
  const [nameError, setNameError] = reactExports.useState("");
  const [contactError, setContactError] = reactExports.useState("");
  const [formState, setFormState] = reactExports.useState("idle");
  function validate() {
    let valid = true;
    if (!finderName.trim()) {
      setNameError("Your name is required.");
      valid = false;
    } else {
      setNameError("");
    }
    if (!finderContact.trim()) {
      setContactError("Phone or email is required.");
      valid = false;
    } else {
      setContactError("");
    }
    return valid;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate() || !keyId) return;
    setFormState("submitting");
    try {
      await submitRequest.mutateAsync({
        keyId,
        finderName: finderName.trim(),
        finderContact: finderContact.trim()
      });
      setFormState("success");
    } catch {
      setFormState("idle");
    }
  }
  const keyNotAvailable = !isLoading && (!key || isKeyReturned(key) || isError || keyId === null);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-screen bg-background flex items-center justify-center px-4 py-12",
      "data-ocid": "finder-page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "w-6 h-6 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-semibold text-foreground", children: "Lost Key Found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm", children: "Help reunite this key with its owner" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl shadow-subtle overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-5 border-b border-border bg-muted/30", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", "data-ocid": "finder-loading", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-64" })
          ] }) : keyId === null || isError ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "text-center py-1",
              "data-ocid": "finder-error-invalid",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive font-medium text-sm", children: "This QR code appears to be invalid." })
            }
          ) : !key || isKeyReturned(key) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center py-1",
              "data-ocid": "finder-error-returned",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive font-medium text-sm", children: !key ? "This key tag could not be found." : "This key has already been returned to its owner." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-1", children: "No further action is needed — thank you!" })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-start gap-3",
              "data-ocid": "finder-key-info",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground font-display truncate", children: key.tag }),
                  key.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5 break-words", children: key.description })
                ] })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-6", children: formState === "success" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-4", "data-ocid": "finder-success", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-6 h-6 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-display font-semibold text-foreground", children: "Thank you!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1 leading-relaxed", children: "Your details have been sent to the owner. They'll reach out to arrange a pickup soon. You're making someone's day! 🙌" })
          ] }) : keyNotAvailable ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-center text-sm text-muted-foreground py-2",
              "data-ocid": "finder-no-action",
              children: "There's nothing to do here. Thank you for scanning!"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", noValidate: true, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "finder-name", children: "Your Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "finder-name",
                  "data-ocid": "finder-name-input",
                  placeholder: "e.g. Alex Johnson",
                  value: finderName,
                  onChange: (e) => setFinderName(e.target.value),
                  onBlur: () => {
                    if (!finderName.trim())
                      setNameError("Your name is required.");
                    else setNameError("");
                  },
                  "aria-describedby": nameError ? "name-error" : void 0,
                  "aria-invalid": !!nameError,
                  disabled: formState === "submitting"
                }
              ),
              nameError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  id: "name-error",
                  className: "text-destructive text-xs",
                  role: "alert",
                  children: nameError
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "finder-contact", children: "Phone or Email" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "finder-contact",
                  "data-ocid": "finder-contact-input",
                  placeholder: "e.g. +1 555 0100 or alex@example.com",
                  value: finderContact,
                  onChange: (e) => setFinderContact(e.target.value),
                  onBlur: () => {
                    if (!finderContact.trim())
                      setContactError("Phone or email is required.");
                    else setContactError("");
                  },
                  "aria-describedby": contactError ? "contact-error" : void 0,
                  "aria-invalid": !!contactError,
                  disabled: formState === "submitting"
                }
              ),
              contactError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  id: "contact-error",
                  className: "text-destructive text-xs",
                  role: "alert",
                  children: contactError
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                className: "w-full",
                "data-ocid": "finder-submit-btn",
                disabled: formState === "submitting" || submitRequest.isPending,
                children: formState === "submitting" || submitRequest.isPending ? "Sending..." : "Notify the Owner"
              }
            ),
            submitRequest.isError && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-destructive text-xs text-center",
                role: "alert",
                children: "Something went wrong. Please try again."
              }
            )
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground mt-6", children: "Your contact details are only shared with the key owner." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground mt-3", children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          ". Built with love using",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : ""
              )}`,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "underline underline-offset-2 hover:text-foreground transition-colors duration-200",
              children: "caffeine.ai"
            }
          )
        ] })
      ] })
    }
  );
}
export {
  FinderPage as default
};
