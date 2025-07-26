(define-map bounties
  uint
  {
    owner: principal,
    reward: uint,
    status: (string-ascii 10), ;; "open", "closed", etc
    offchain-ref: (string-ascii 100)
  }
)

(define-data-var bounty-counter uint u0)

(define-public (create-bounty (reward uint) (offchain-ref (string-ascii 100)))
  (if (is-eq reward u0)
    (err u100) ;; error code for invalid reward
    (if (> (len offchain-ref) u100)
      (err u101) ;; error code for offchain-ref too long
      (let ((id (+ (var-get bounty-counter) u1)))
        (begin
          (map-set bounties id {
            owner: tx-sender,
            reward: reward,
            status: "open",
            offchain-ref: offchain-ref
          })
          (var-set bounty-counter id)
          (ok id)
        )
      )
    )
  )
)

(define-read-only (get-bounty (id uint))
  (map-get? bounties id)
)

(define-read-only (get-bounty-counter)
  (ok (var-get bounty-counter))
)

